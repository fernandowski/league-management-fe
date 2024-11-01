import {Animated, View} from "react-native";
import ScrollView = Animated.ScrollView;
import {Card, Text} from "react-native-paper";

export default function TeamList () {
    const data = [{name: 'one'}, {name: 'two'}, {name: 'three'}, {name: 'one'}, {name: 'two'}, {name: 'three'}];
    return (
        <View>
            <ScrollView>
                {
                    data.map((item) => (
                        <Card style={{marginBottom: 8, marginLeft: 1, marginRight: 1}} key={item.name}>
                            <Card.Content>
                                <Text>{item.name}</Text>
                            </Card.Content>
                        </Card>
                    ))
                }
            </ScrollView>
        </View>
    )
}
