import {StyleSheet, Text, View} from "react-native";
import React from "react";

interface InfoProps {
  title: string;
  tags: string[];
  description: string;
}

const Info: React.FC<InfoProps> = ({title, tags, description}) => {
  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <View style={styles.tagContainer}>
        {tags.map((tag, index) => (
          <Text key={index} style={styles.tag}>
            {tag}
          </Text>
        ))}
      </View>
    </View>
  );
};

export default Info;

const styles = StyleSheet.create({
  title: {color: "white", fontSize: 15, fontWeight: "bold"},
  tagContainer: {flexDirection: "row", flexWrap: "wrap"},
  tag: {color: "gray", fontSize: 12, marginRight: 8},
  description: {color: "white", fontSize: 13},
});
