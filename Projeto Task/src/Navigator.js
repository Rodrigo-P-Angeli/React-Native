/* eslint-disable semi */
/* eslint-disable prettier/prettier */
import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createDrawerNavigator } from 'react-navigation-drawer'
import TaskList from './Screens/TaskList'
import Auth from './Screens/Auth'
import Menu from './Screens/Menu'
import AuthorApp from './Screens/AuthorApp'

import CommonStyles from './CommonStyles'

const MenuConfig = {
    initialRouteName: 'Today',
    contentComponent: props => <Menu {...props}/>,
    contentOptions: {
        labelStyle: {
            fontFamily: CommonStyles.fontFamily,
            fontWeight: 'normal',
            fontSize: 20,
        },
        activeLabelStyle: {
            fontWeight: 'bold',
            color: '#080',
        },
    },
}

const menuRoutes = {
    Today: {
        name: 'Today',
        screen: props => <TaskList {...props} title={'Hoje'} daysAhead={0} />,
        navigationOptions: {
            title: 'Hoje',
        },
    },
    Tomorrow: {
        name: 'Tomorrow',
        screen: props => <TaskList {...props} title={'Amanhã'} daysAhead={1} />,
        navigationOptions: {
            title: 'Amanhã',
        },
    },
    Week: {
        name: 'Week',
        screen: props => <TaskList {...props} title={'Semana'} daysAhead={7} />,
        navigationOptions: {
            title: 'Semana',
        },
    },
    Month: {
        name: 'Month',
        screen: props => <TaskList {...props} title={'Mês'} daysAhead={30} />,
        navigationOptions: {
            title: 'Mês',
        },
    },
}

const menuNavigator = createDrawerNavigator(menuRoutes, MenuConfig)

const mainRoute = {
    AuthorApp: {
        name: 'AuthorApp',
        screen: AuthorApp,
    },
    Auth: {
        name: 'Auth',
        screen: Auth,
    },
    Home: {
        name: 'Home',
        screen: menuNavigator,
    },
}

const mainNavigator = createSwitchNavigator(mainRoute, {
    initialRouteName: 'AuthorApp',
})



export default createAppContainer(mainNavigator)
