import { ReactNode } from "react";

type Props = {
  children: ReactNode
};

type ContainerProps = {
  children: ReactNode
};

const Container = (props: ContainerProps) => {
  return (
    <main className='container mx-auto mt-5 md:mt-10'>
      {props.children}
    </main>
  );
};

export const Layout = (props: Props) => {

  return (
    <div className='min-h-screen'>
      <Container>{props.children}</Container>
    </div>
  );
};
