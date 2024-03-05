import { Image, List } from "antd-mobile";
import { users } from "./users";

const HomeList = () => {
  return (
    <>
      <List>
        {users.map((item) => {
          <List.Item
            key={item.id}
            prefix={
              <Image
                src={item.avatar}
                style={{ borderRadius: 20 }}
                fit="cover"
                width={40}
                height={40}
              />
            }
            description={item.description}
          >
            {item.name}
          </List.Item>;
        })}
      </List>
    </>
  );
};

export default HomeList;
