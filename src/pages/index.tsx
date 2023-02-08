import Link from "next/link";
import { GetServerSideProps } from "next";
import { Amplify, API, Auth, withSSRContext } from "aws-amplify";
import awsExports from "@/aws-exports";
import { listTodos } from "@/graphql/queries";

Amplify.configure({ ...awsExports, ssr: true });

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
  return (
    <div>
      <ul>
        <li>
          <Link href="/todos">Todo List</Link>
        </li>
        <li>
          <Link href="/todos/create">Create new todo</Link>
        </li>
        <li>
          <Link href="/login">LOGIN</Link>
        </li>
      </ul>
    </div>
  );
}
