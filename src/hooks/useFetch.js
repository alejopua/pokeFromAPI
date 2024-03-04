import { useEffect, useState } from "react"

const localCache = {};

export const useFetch = ( url ) => {
  const [state, setState] = useState({
    data: null,
    isLoading: true,
    hasError: false,
    error: null,
  })

  useEffect(() => {
    getFetch();
  }, [url])

  const setLoadingState = () => {
    setState({
      ...state,
      isLoading: true,
    })
  }

  const getFetch = async() => {

    if ( localCache[url] ) {
      setState({
        data: localCache[url],
        isLoading: false,
        hasError: false,
        error: null
      })
      return;
    }


    setLoadingState();

    const res = await fetch(url);
    await new Promise( resolve => setTimeout(resolve, 1000))

    if (!res.ok) {
      setState({
        data: null,
        isLoading: false,
        hasError: true,
        error: {
          code: res.status,
          message: res.statusText,
        }
      })
      return;
    }

    const data = await res.json();

    setState({
      data,
      isLoading: false,
      hasError: false,
      error: null
    })

    // manejo caché
    localCache[url] = data;
  }

  return {
    data: state.data,
    isLoading: state.isLoading,
    hasError: state.hasError
  };
}