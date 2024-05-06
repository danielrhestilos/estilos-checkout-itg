import { useEffect, useState } from 'react'

interface RequestParams {
  url: string
  method: string
  headers?: Record<string, string>
  body?: any
}

interface ApiResponse<T> {
  data: T | null
  error: Error | null
  isLoading: boolean
}

const Headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
}

export async function request<T>(params: RequestParams): Promise<T> {
  try {
    const requestOptions = {
      method: params.method,
      headers: {
        ...Headers,
        ...params.headers,
      },
      body: params.body ? JSON.stringify(params.body) : undefined,
    }

    const response = await fetch(params.url, requestOptions)

    if (!response.ok) {
      throw new Error('Error en la solicitud')
    }

    return response.statusText === 'No Content' ? {} : response.json()
  } catch (error) {
    console.error(error)
    throw error
  }
}

function useApiRequest<T>(
  url?: string,
  method?: string,
  body?: any,
  headers: Record<string, string> = Headers
): ApiResponse<T> {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function fetchData() {
      if (!url || !method) return
      setIsLoading(true)
      try {
        const response = await request<T>({ url, method, headers, body })

        setData(response)
      } catch (err) {
        const typedError = err as Error

        setError(typedError)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [url, method, headers, body])

  return { data, error, isLoading }
}

export default useApiRequest
