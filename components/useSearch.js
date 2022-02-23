import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const useSearch = ({ setListings }) => {
  const base_url = process.env.NEXT_PUBLIC_BASE_URL;
  const router = useRouter();
  const { query, pathname, locale } = router;
  const [filters, setFilters] = useState({
    title: "",
    purpose: query.purpose ? query.purpose : "any",
    township: query.township ? query.township : "any",
    state: query.state ? query.state : "any",
    category: query.category ? query.category : "any",
  });
  //   const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const fetchData = async (filtersQuery) => {
    const queryArray = [];
    for (let q in filtersQuery) {
      if (filtersQuery[q] && filtersQuery[q] !== "any") {
        queryArray.push(`${q}=${filtersQuery[q]}`);
      }
      // queryString += `${q}=${query[q]}&`;
    }
    const queryString = queryArray.join("&");
    router.push(
      { pathname, query: filtersQuery },
      `${pathname}?${queryString}`,
      {
        locale,
        shallow: true,
      }
    );
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `${base_url}/api/listings?${queryString}`
      );
      setListings(data);
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData(filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    filters,
    // filters.title,
    // filters.category,
    // filters.purpose,
    // filters.min,
    // filters.max,
    // filters.township,
    // filters.state,
  ]);

  return { filters, onChange, isLoading };
};

export default useSearch;
