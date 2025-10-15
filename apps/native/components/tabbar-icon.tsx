import FontAwesome from "@expo/vector-icons/FontAwesome";

export const TabBarIcon = (props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
  size?: number;
}) => {
  return (
    <FontAwesome
      size={props.size || 28}
      style={{ marginBottom: -3 }}
      {...props}
    />
  );
};
