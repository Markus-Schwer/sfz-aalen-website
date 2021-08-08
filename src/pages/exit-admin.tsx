import { FunctionComponent, useEffect } from "react";
import { useRouter } from "next/router";
import { useCMS } from "tinacms";

const GoToEditPage: FunctionComponent<any> = () => {
  const cms = useCMS();
  const router = useRouter();
  useEffect(() => {
    cms.disable();
    router.back();
  }, []);
  return <div>Entering edit mode..</div>;
};

export default GoToEditPage;
