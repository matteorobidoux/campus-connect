import axios from "axios";
import { useMutation, useQuery } from "react-query";

const useGoogleOAuth = () => {
  const getter = async () => {
    if (document.documentURI.includes("/gauth")) {
      const r = await axios.get(document.documentURI);
      window.history.pushState('', 'Index', '/');
      return r.data;
    } 
  }

  return useQuery(['googleOAuth', document.documentURI], getter, { staleTime: Infinity, retry: false })
}

export { useGoogleOAuth };
