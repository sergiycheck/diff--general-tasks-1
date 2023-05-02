import { NextApiRequest, NextApiResponse } from "next";
import { Session, getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { authOptions } from "./api/auth/[...nextauth]";

export async function getServerSideProps(context: {
  params: any;
  req: NextApiRequest;
  res: NextApiResponse;
}) {
  const { req, res } = context;

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
export default function Home(props: { session: Session }) {
  const { session } = props;

  return (
    <div className={`flex min-h-screen flex-col items-center justify-between`}>
      <div className="flex flex-col gap-2">
        <h1>Current user</h1>
        <p>email: {session?.user?.email}</p>
        <p>role: {session?.user?.role}</p>
      </div>
    </div>
  );
}
