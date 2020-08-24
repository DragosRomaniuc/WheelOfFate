import React from 'react'
import { Animated, Dimensions, Image, FlatList, Modal, StyleSheet, ScrollView } from 'react-native';
import { Block, Text, Button, Pushable } from 'components/common';
import { colors, sizes, fonts, width, height } from 'utils/ui';
import navigationOptions from './navigationOptions';
import { StackNavigationProp, } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { employeeUseCases } from 'app-core/useCases';
import moment from 'moment';

type UnauthenticatedStackParamList = {
    WELCOME: undefined;
}
// interface ScreenParams extends Welcome 
type WELCOMEScreenNavigationProp = StackNavigationProp<UnauthenticatedStackParamList, 'WELCOME'>
type WELCOMEScreenRouteProp = RouteProp<UnauthenticatedStackParamList, 'WELCOME'>

type Props = {
    navigation: WELCOMEScreenNavigationProp,
    route: WELCOMEScreenRouteProp
}

const Welcome = (props: Props) => {
    const [showTerms, setShowResults] = React.useState<boolean>(false);
    const scrollX = React.useRef(new Animated.Value(0)).current;
    const [results, setResults] = React.useState<object[]>([]);
    const [newEmployee, setNewEmployee] = React.useState(null);

    const illustrations = [
        { id: 0, name: require('../../../assets/images/wheel.png') },
        { id: 1, name: require('../../../assets/images/team.png') },
        { id: 2, name: require('../../../assets/images/stress_2.png') },
    ]

    const spinTheWheel = async () => {
        // console.log(employeeUseCases.generateSchedule())
       try {
        let schedule = await employeeUseCases.generateSchedule();
        // console.log(schedule)
        setShowResults(true);
        setResults(schedule.result);
       } catch (err) {
           console.log(err);
       }
        // console.log(schedule.results, 'results');
    };

    const createRandomEmployee = async () => {
        let createdEmployee = await employeeUseCases.createRandomEmployee();
        console.log('createdEmployee', createdEmployee);
        setNewEmployee(createdEmployee);
    }


    const renderResults = () => {
        return (
            <Modal animationType="slide" visible={showTerms}>
                <Block padding={[sizes.padding * 2, sizes.padding]} space="between">
                    <Text h2 light>Generated Shift</Text>

                    <ScrollView style={{ marginVertical: sizes.padding }}>
                        {
                            results.map((item: any) => {
                                return (
                                    <Block>
                                        <Text bold height={28} style={{ marginBottom: sizes.base }}>
                                        Name: {item.firstName} {item.lastName}
                                       
                                    </Text>
                                         <Text caption gray height={24} style={{ marginBottom: sizes.base }}>
                                        Shift start: {moment(item.lastShiftStart).utc().format('DD MMMM YYYY hh:mm A')}
                                    </Text>
                                    <Text caption gray height={24} style={{ marginBottom: sizes.base }}>
                                        Shift end: {moment(item.lastShiftEnd).utc().format('DD MMMM YYYY hh:mm A')}
                                    </Text>
                                        </Block>
                                    
                                )
                            })
                        }
            
                    </ScrollView>

                    <Block middle padding={[sizes.base / 2, 0]}>
                        <Button gradient onPress={() => setShowResults(false)} style={{marginBottom: 30}}>
                            <Text center white>Generate another shift</Text>
                        </Button>
                    <Button black onPress={() => setShowResults(false)} stlye={{padding: 20}}>
                            <Text center white>CHOOSE THIS SHIFT </Text>
                        </Button>
                        <Text center white> <Text color="red">Logic is implemented, ±4hours of coding needed</Text></Text>
                    </Block>
                </Block>
            </Modal>
        )
    }

    const renderText = (id: any) => {
        switch (id) {
            case 0:
                return <Text center bold>
                    Spin the
         <Text primary> wheel.</Text>
                </Text>
            case 1:
                return <Text center bold>
                    Get random employee
         <Text primary> shift.</Text>
                </Text>
            case 2:
                return <Text center bold>
                    Free your time for other
                <Text primary> important things.</Text>
                </Text>
        }
    }

    const renderIllustrations = () => {
        return (
            <FlatList
                horizontal
                pagingEnabled
                scrollEnabled
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                snapToAlignment="center"
                data={illustrations}
                keyExtractor={(item, index) => `${item.id}`}
                renderItem={({ item }) => (
                    <Block center>
                       <Pushable onPress={() => console.log('pressed')}>
                        <Image
                                key={item.id}
                                source={item.name}
                                resizeMode="contain"
                                style={{ width: width, height: height / 2.3, overflow: 'visible' }}
                            />
                       </Pushable>
                        {/* <Icon name="Roulette" size={390}/> */}
                        <Block center bottom >
                            {renderText(item.id)}
                        </Block>
                    </Block>

                )}
                onScroll={
                    Animated.event([{
                        nativeEvent: { contentOffset: { x: scrollX } }
                    }])
                }
            />
        )
    }

    const renderSteps = () => {
        const stepPosition = Animated.divide(scrollX, width);
        return (
            <Block row center middle style={styles.stepsContainer}>
                {illustrations.map((item: any, index: any) => {
                    const opacity = stepPosition.interpolate({
                        inputRange: [index - 1, index, index + 1],
                        outputRange: [0.4, 1, 0.4],
                        extrapolate: 'clamp',
                    });

                    return (
                        <Block
                            animated
                            flex={false}
                            key={`step-${index}`}
                            color="gray"
                            style={[styles.steps, { opacity }]}
                        />

                    )
                })}
            </Block>
        )
    }

    return (
        <Block>
            <Block center bottom flex={0.4} margin={[20, 0]}>

                <Text h1 center bold>

                    WHEEL OF
            <Text h1 primary> Fate.</Text>
                </Text>
                <Text h3 gray2 style={{ marginTop: sizes.padding / 2 }}>
                    by Dragos Romaniuc
          </Text>
            </Block>
            <Block center middle>
                {renderIllustrations()}
                {renderSteps()}
            </Block>
            <Block gradient middle flex={0.5} margin={[0, sizes.padding * 2]} >
                <Button gradient={true} onPress={() => spinTheWheel()}>
                    <Text center semibold white>SPIN</Text>
                </Button>
                <Button white shadow onPress={() => createRandomEmployee()} margin={[20, 0]}>
                    <Text center semibold>Create Random Employee</Text>
                </Button>
                {newEmployee && <Text center middle black>
                        {newEmployee?.firstName} {newEmployee?.lastName} {newEmployee?.email} created!
                    </Text>}
                <Button style={{ backgroundColor: 'transparent' }} onPress={() => setShowResults(true)}>
                    <Text center caption gray>Results</Text>
                </Button>
            </Block>
            {renderResults()}
        </Block>
    )

}

Welcome.navigationOptions = navigationOptions;

export default Welcome;

const styles = StyleSheet.create({
    stepsContainer: {
        position: 'absolute',
        bottom: sizes.base * 3,
        right: 0,
        left: 0,
    },
    steps: {
        width: 5,
        height: 5,
        borderRadius: 5,
        marginHorizontal: 2.5,
    },
})
