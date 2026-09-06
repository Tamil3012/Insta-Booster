export const WEB3FORMS_ACCESS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "26d7f916-c14f-41e4-a067-59109fee1769";

export interface Web3FormsResponse {
  success: boolean;
  message: string;
  data?: any;
}

/**
 * Submits form data directly to the Web3Forms API endpoint.
 * Supports both standard FormData and plain JavaScript key-value objects.
 */
export async function submitToWeb3Forms(
  payload: FormData | Record<string, any>,
  customSubject?: string
): Promise<Web3FormsResponse> {
  try {
    let body: BodyInit;
    let headers: Record<string, string> = {
      Accept: "application/json",
    };

    if (payload instanceof FormData) {
      if (!payload.has("access_key")) {
        payload.append("access_key", WEB3FORMS_ACCESS_KEY);
      }
      if (customSubject && !payload.has("subject")) {
        payload.append("subject", customSubject);
      }
      body = payload;
    } else {
      headers["Content-Type"] = "application/json";
      body = JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: customSubject || "Form Submission",
        ...payload,
      });
    }

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers,
      body,
    });

    const data = await response.json();
    return {
      success: !!data.success,
      message: data.message || (data.success ? "Form submitted successfully" : "Submission failed"),
      data,
    };
  } catch (error: any) {
    console.error("Web3Forms submission error:", error);
    return {
      success: false,
      message: error?.message || "Failed to submit form. Please try again.",
    };
  }
}
