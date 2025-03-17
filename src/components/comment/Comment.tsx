import {StyleSheet, Text, View} from "react-native";
import {Comment as CommentType} from "@/types/short";
import moment from "moment";
import "moment/locale/ko"; // 한국어 로케일 추가

moment.locale("ko"); // 한국어로 설정

interface CommentProps {
  comment: CommentType;
}

const Comment: React.FC<CommentProps> = ({comment}) => {
  const {author, content, createdAt} = comment;

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.author}>{author}</Text>
        <Text style={styles.createdAt}>{moment(createdAt).fromNow()}</Text>
      </View>
      <Text style={styles.content}>{content}</Text>
    </View>
  );
};

export default Comment;

const styles = StyleSheet.create({
  container: {paddingHorizontal: 16, paddingVertical: 8},
  author: {fontSize: 14, color: "white", fontWeight: "bold", marginRight: 4},
  content: {fontSize: 12, color: "white", marginTop: 4},
  createdAt: {fontSize: 10, color: "white"},
  row: {flexDirection: "row", alignItems: "center"},
});
