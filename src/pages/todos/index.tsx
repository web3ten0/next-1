import Link from "next/link";
import { GetServerSideProps } from "next";
import { withSSRContext } from "aws-amplify";
import { listTodos } from "@/graphql/queries";
import { useAuthenticator } from "@aws-amplify/ui-react";

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  console.log("server start");
  const SSR = withSSRContext({ req });
  try {
    const response = await SSR.API.graphql({ query: listTodos });
    console.log("response", response);
    return {
      props: {
        todos: response.data.listTodos.items,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      props: {},
    };
  }
};

export default function Hoge() {
  const { user } = useAuthenticator((context) => [context.user]);
  return (
    <>
      {!user && (
        <div>
          <Link href="/login">LOGIN</Link>
        </div>
      )}
    </>
  );
}
