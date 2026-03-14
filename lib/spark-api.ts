import { SPARK_API_BASE } from "./constants";

interface SparkAuthResponse {
  access_token: string;
  expires_in: number;
  refresh_token?: string;
}

interface SparkListing {
  Id: string;
  ListPrice: number;
  StandardStatus: string;
  UnparsedAddress: string;
  City: string;
  StateOrProvince: string;
  PostalCode: string;
  BedroomsTotal: number;
  BathroomsTotalInteger: number;
  LivingArea: number;
  ListingId: string;
  Latitude: number;
  Longitude: number;
  Media?: Array<{
    MediaURL: string;
    ShortDescription: string;
  }>;
}

interface SparkSearchParams {
  status?: string;
  city?: string;
  priceMin?: number;
  priceMax?: number;
  propertyType?: string;
  limit?: number;
  offset?: number;
}

export class SparkClient {
  private apiKey: string;
  private apiSecret: string;

  constructor(apiKey?: string, apiSecret?: string) {
    this.apiKey = apiKey || process.env.SPARK_API_KEY || "";
    this.apiSecret = apiSecret || process.env.SPARK_API_SECRET || "";
  }

  private getAuthHeader(): string {
    return `SparkApi ApiKey="${this.apiKey}"`;
  }

  async validateCredentials(): Promise<{
    valid: boolean;
    message: string;
    mlsName?: string;
  }> {
    try {
      const response = await fetch(`${SPARK_API_BASE}/my/account`, {
        headers: {
          Authorization: this.getAuthHeader(),
          Accept: "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        return {
          valid: true,
          message: "Connected successfully",
          mlsName: data?.D?.Results?.[0]?.Mls || "Unknown MLS",
        };
      }

      return {
        valid: false,
        message: `Authentication failed (${response.status})`,
      };
    } catch (error) {
      return {
        valid: false,
        message: `Connection error: ${error instanceof Error ? error.message : "Unknown"}`,
      };
    }
  }

  async searchListings(params: SparkSearchParams = {}): Promise<{
    listings: SparkListing[];
    total: number;
  }> {
    const filters: string[] = [];

    if (params.status) filters.push(`StandardStatus Eq '${params.status}'`);
    if (params.city) filters.push(`City Eq '${params.city}'`);
    if (params.priceMin) filters.push(`ListPrice Ge ${params.priceMin}`);
    if (params.priceMax) filters.push(`ListPrice Le ${params.priceMax}`);
    if (params.propertyType)
      filters.push(`PropertyType Eq '${params.propertyType}'`);

    const queryParams = new URLSearchParams();
    if (filters.length > 0) queryParams.set("$filter", filters.join(" And "));
    if (params.limit) queryParams.set("$top", params.limit.toString());
    if (params.offset) queryParams.set("$skip", params.offset.toString());
    queryParams.set("$orderby", "-ListPrice");

    const response = await fetch(
      `${SPARK_API_BASE}/listings?${queryParams.toString()}`,
      {
        headers: {
          Authorization: this.getAuthHeader(),
          Accept: "application/json",
        },
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      throw new Error(`Spark API error: ${response.status}`);
    }

    const data = await response.json();
    return {
      listings: data?.D?.Results || [],
      total: data?.D?.TotalCount || 0,
    };
  }

  async getListing(listingId: string): Promise<SparkListing | null> {
    const response = await fetch(
      `${SPARK_API_BASE}/listings/${listingId}?$expand=Media`,
      {
        headers: {
          Authorization: this.getAuthHeader(),
          Accept: "application/json",
        },
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) return null;

    const data = await response.json();
    return data?.D?.Results?.[0] || null;
  }

  async getSystemInfo(): Promise<{
    name: string;
    listingCount: number;
  }> {
    const response = await fetch(`${SPARK_API_BASE}/system`, {
      headers: {
        Authorization: this.getAuthHeader(),
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      return { name: "Unknown", listingCount: 0 };
    }

    const data = await response.json();
    const system = data?.D?.Results?.[0];
    return {
      name: system?.Name || "Unknown MLS",
      listingCount: system?.Configuration?.ListingCount || 0,
    };
  }
}
