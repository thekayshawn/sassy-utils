import { strings } from "./strings"
import { BoolBacks } from "../types"
import axios, { AxiosError, AxiosRequestConfig } from "axios"

type ServiceInitiatorProps<Response> = AxiosRequestConfig<Response> &
  Partial<BoolBacks<Response>>

async function serviceInitiator<Response>({
  onSuccess,
  onFailure,
  ...props
}: ServiceInitiatorProps<Response>) {
  try {
    const response = await axios(props)

    if (response.status === 200) {
      const { data, status } = response

      // Well, an extra layer of protection never hurts 😉
      if (data && status == 200) {
        onSuccess?.(data)
        return
      }
    }

    // Why do we fall Bruce? Only to rise back up.
    console.error(JSON.stringify(response))

    onFailure?.({
      error: response,
      message: response.data?.message || strings.DEFAULT_ERROR_MESSAGE,
    })
  } catch (e) {
    const error = e as AxiosError<{
      message?: string
    }>

    // This is the recommended error handling approach by axios.
    if (error.response) {
      // Status code is not 200.
      console.error(strings.DEFAULT_ERROR_MESSAGE, error)

      onFailure?.({
        error: error.response,
        message: error.response.data?.message || strings.DEFAULT_ERROR_MESSAGE,
      })

      return
    }

    if (error.request) {
      // No response was received.
      console.error("Server timed out!", error)

      onFailure?.({ message: "Server timed out!" })
      return
    }

    if (error.message) {
      // Error while sending the request.
      console.error("Error while sending the request!", error)

      onFailure?.({ message: strings.DEFAULT_ERROR_MESSAGE })
      return
    }

    console.error("There was an unidentified error", error)

    onFailure?.({ message: strings.DEFAULT_ERROR_MESSAGE })
  }
}

/**
 * A wrapper around axios to make http requests.
 *
 * @param props AxiosRequestConfig
 *
 * @returns void
 *
 * @example
 * ```ts
 * httpService({
 *  url: "https://jsonplaceholder.typicode.com/todos/1",
 *  method: "GET",
 *  onSuccess: (data) => console.log(data),
 *  onFailure: (error) => console.log(error),
 * })
 * ```
 */
export const httpService = <Response = unknown>(props: AxiosRequestConfig) =>
  serviceInitiator<Response>(props)

/**
 * A wrapper around axios.get to make GET http requests.
 *
 * @param props AxiosRequestConfig
 *
 * @returns void
 *
 * @example
 * ```ts
 * httpService.get({
 *  url: "https://jsonplaceholder.typicode.com/todos/1",
 *  onSuccess: (data) => console.log(data),
 *  onFailure: (error) => console.log(error),
 * })
 * ```
 */
httpService.get = <Response = unknown>(
  props: Omit<AxiosRequestConfig, "method" | "data">
) =>
  serviceInitiator<Response>({
    ...props,
    method: "GET",
  })

/**
 * A wrapper around axios.post to make POST http requests.
 *
 * @param props AxiosRequestConfig
 *
 * @returns void
 *
 * @example
 * ```ts
 * httpService.post({
 *  url: "https://jsonplaceholder.typicode.com/todos/1",
 *  data: {
 *   title: "foo",
 *   body: "bar",
 *   userId: 1,
 *  },
 *  onSuccess: (data) => console.log(data),
 *  onFailure: (error) => console.log(error),
 * })
 * ```
 */
httpService.post = <Response = unknown>(
  props: Omit<AxiosRequestConfig, "method">
) =>
  serviceInitiator<Response>({
    ...props,
    method: "POST",
  })

/**
 * A wrapper around axios.put to make PUT http requests.
 *
 * @param props AxiosRequestConfig
 *
 * @returns void
 *
 * @example
 * ```ts
 * httpService.put({
 *  url: "https://jsonplaceholder.typicode.com/todos/1",
 *  data: {
 *   title: "foo",
 *   body: "bar",
 *   userId: 1,
 *  },
 *  onSuccess: (data) => console.log(data),
 *  onFailure: (error) => console.log(error),
 * })
 * ```
 */
httpService.put = <Response = unknown>(
  props: Omit<AxiosRequestConfig, "method">
) =>
  serviceInitiator<Response>({
    ...props,
    method: "PUT",
  })

/**
 * A wrapper around axios.delete to make DELETE http requests.
 *
 * @param props AxiosRequestConfig
 *
 * @returns void
 *
 * @example
 * ```ts
 * httpService.delete({
 *  url: "https://jsonplaceholder.typicode.com/todos/1",
 *  onSuccess: (data) => console.log(data),
 *  onFailure: (error) => console.log(error),
 * })
 * ```
 */
httpService.delete = <Response = unknown>(
  props: Omit<AxiosRequestConfig, "method">
) =>
  serviceInitiator<Response>({
    ...props,
    method: "DELETE",
  })

/**
 * A wrapper around axios.patch to make PATCH http requests.
 *
 * @param props AxiosRequestConfig
 *
 * @returns void
 *
 * @example
 * ```ts
 * httpService.patch({
 *  url: "https://jsonplaceholder.typicode.com/todos/1",
 *  data: {
 *   title: "foo",
 *   body: "bar",
 *   userId: 1,
 *  },
 *  onSuccess: (data) => console.log(data),
 *  onFailure: (error) => console.log(error),
 * })
 * ```
 */
httpService.patch = <Response = unknown>(
  props: Omit<AxiosRequestConfig, "method">
) =>
  serviceInitiator<Response>({
    ...props,
    method: "PATCH",
  })
