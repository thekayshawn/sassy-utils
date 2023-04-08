export type HttpServiceError = {
  readonly error?: unknown
  readonly message: string
}

export type BoolBacks<T = unknown> = {
  readonly onSuccess: (data: T) => unknown
  readonly onFailure: (error: HttpServiceError) => unknown
}

export type HTMLHeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
