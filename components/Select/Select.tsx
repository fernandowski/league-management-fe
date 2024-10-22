import {StyleSheet, View} from "react-native";
import {Picker} from "@react-native-picker/picker";
import {useState} from "react";


interface SelectProps {
    onChange: (value: string) => void
    data: { value: string, label: string }[]
}
export function Select (props: SelectProps) {
    const [selectedValue, setSelectedValue] = useState('');
    return (
        <View>
            <Picker
                style={[styles.picker]}
                selectedValue={selectedValue}
                onValueChange={(value: string, _index: number) => {
                    setSelectedValue(value);
                    props.onChange(value);
                }}
            >
                {
                    props.data.map((item) => (
                        <Picker.Item label={item.label} value={item.value} key={item.value} />
                    ))
                }
            </Picker>
        </View>
    )
}


const styles = StyleSheet.create({
    picker: {
        maxWidth: 200
    }
});
