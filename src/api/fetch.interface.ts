// result interface
export interface FetchResult {
  status: number;
  body: any;
  headers?: {
    done?: boolean;
    vaule?: string[];
  };
  ok?: boolean;
  redirected?: boolean;
  statusText?: string;
  type?: string;
  url?: string;
}

// headers
export interface HeadersInterface {
  method: string;
  headers?: {
    "Content-Type"?: string;
    Authorization?: string;
    Accept?: string;
    "Accept-Charset"?: string;
    "Accept-Encoding"?: string;
    "Access-Control-Allow-Origin"?: string;
    "Access-Control-Allow-Headers"?: string;
    "Access-Control-Allow-Methods"?: string;
    Origin?: string;
    Location?: string;
  };
  body?: string;
  mode?: string;
  cache?: string;
  credentials?: string;
  redirect?: string;
  referrerPolicy?: string;
}
