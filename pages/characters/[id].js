import { useRouter } from "next/router";
import Card from "../../components/Card";
import Layout from "../../components/Layout";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Character() {
  const router = useRouter();
  const { id } = router.query;
  console.log(id);

  const { data, isLoading, error } = useSWR(
    `https://swapi.dev/api/people/${id}`,
    fetcher
  );

  console.log(data);

  if (isLoading) {
    return <h1>... is loading</h1>;
  }

  if (error) {
    return <h1>Error!</h1>;
  }

  return (
    <Layout>
      <Card
        id={id}
        name={data.name}
        height={data.height}
        eyeColor={data.eye_color}
        birthYear={data.birth_year}
      />
    </Layout>
  );
}
