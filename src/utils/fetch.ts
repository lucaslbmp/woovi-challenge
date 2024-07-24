import useSWR from "swr";

export function useSWRFetch(fetcher: (...args:any[]) => Promise<any>, ...rest : any[]){
  const _args = rest?.length  ? [...rest] : [null]
  return useSWR([..._args], ([...args]) => args.length ? fetcher.apply(null, [...rest]) : fetcher() );
}
