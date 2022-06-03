import { View, Text, TouchableOpacity} from 'react-native'
import { css } from './Css.js'

const Radio = ({options=[],horizontal=false,onChangeSelect,selected}) => {
    return(
      <View style={horizontal ? css.horizontal : css.vertical}>
        {options.map((opt,index) => (
            <TouchableOpacity onPress={()=>onChangeSelect(opt,index)} style={[css.optContainer,{marginLeft : horizontal?10:0,marginTop: horizontal?0:10}]}>
              <View style={css.outLineCircle}>
                {selected==index && <View style={css.innerCircle}/>}
              </View>
              <Text style={[css.txt, {color : selected== index ? '#444':'#777' }]}>{opt}</Text>
            </TouchableOpacity>
          )
          )
        }
      </View>
    );
  }
export default Radio;