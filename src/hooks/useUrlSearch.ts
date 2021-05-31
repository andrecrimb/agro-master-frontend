import { useMemo } from 'react'
import { useHistory } from 'react-router'
import { Dictionary } from 'types/common'
import qs from 'query-string'

type Props = {
  params: string[]
  formatValues?: Dictionary<(paramValue?: any) => any>
}

/**
 * @description Hook responsible to watch and manipulate URL search params
 * @example
 * const { params, clearAllParams, setParams } = useUrlSearch({
 *    params: ["page_size", "page", "cid_startswith"],
 *    formatValues: {
 *      "page_size": value => customFormat(value)
 *    }
 * }, [])
 * @param additionalDeps Beyond URL changes you can track other dependencies, used specially if you specify formatValues
 * @param params Array with the search params that you want to watch
 * @param formatValues Formats the param received from the URL
 * @exports params Object with params already formatted
 * @exports clearAllParams Function that remove all params from URL (the ones used by the hook)
 * @exports setParams Function to set params values
 * @example
 *    setParams({ value1: "a", value2. "b" })
 */
function useUrlSearch(props: Props, additionalDeps: any[] = []) {
  const history = useHistory()

  const watchedParamsFormatted = useMemo(() => {
    const urlSearch = qs.parse(history.location.search, {
      parseNumbers: true,
      parseBooleans: true,
      arrayFormat: 'comma'
    })

    return props.params.reduce((prev, next) => {
      const paramValue = urlSearch[next]
      if (urlSearch[next] || props.formatValues?.[next]) {
        return {
          ...prev,
          [next]: props.formatValues?.[next] ? props.formatValues[next](paramValue) : paramValue
        }
      }
      return prev
    }, {} as Dictionary<string>)
  }, [history.location.search, ...additionalDeps])

  const setParams = (paramsToSet: Dictionary<any>) => {
    const allParams = qs.parse(history.location.search, {
      parseNumbers: true,
      parseBooleans: true,
      arrayFormat: 'comma'
    })

    const searchString = qs.stringify(
      { ...allParams, ...paramsToSet },
      {
        arrayFormat: 'comma',
        skipEmptyString: true,
        skipNull: true
      }
    )
    history.push({ search: searchString })
  }

  const clearAllParams = (defaultParams?: Dictionary<any>) => {
    const newParams = props.params.reduce((prev, next) => {
      return { ...prev, [next]: '', ...defaultParams }
    }, {})
    setParams(newParams)
  }

  return {
    params: watchedParamsFormatted,
    clearAllParams,
    setParams
  }
}

export default useUrlSearch
