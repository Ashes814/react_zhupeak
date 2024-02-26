import React from "react";
import { useParams, useSearchParams } from "react-router-dom";

const Article = () => {
  // const [params] = useSearchParams();
  // let id = params.get("id");
  // let name = params.get("name");

  const params = useParams();
  let id = params.id;
  let name = params.name;

  return (
    <div>
      Article {id}:{name}
    </div>
  );
};
export default Article;
