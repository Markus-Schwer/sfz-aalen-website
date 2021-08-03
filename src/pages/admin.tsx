import { FunctionComponent, useEffect } from "react";
import { useRouter } from "next/router";
import { useEditState } from "tinacms/dist/edit-state";

const GoToEditPage: FunctionComponent<any> = () => {
  const { setEdit } = useEditState();
  const router = useRouter();
  useEffect(() => {
    setEdit(true);
    router.back();
  }, []);
  return <div>Entering edit mode..</div>;
};

export default GoToEditPage;
