import { Tabs, Tab, Box } from '@mui/material';
import React from 'react'

interface TabListProps {
    children: React.ReactElement[];
}

function TabList(props: TabListProps) {
    const [value, setValue] = React.useState(0)
    const { children } = props

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue)
    }

    function a11yProps(index: number) {
        return {
            id: `tab-${index}`,
            'aria-controls': `tabpanel-${index}`
        }
    }
    const rootChild = children.map(child => {
        return (
            <div
                role="tabpanel"
                hidden={value !== child.props.index}
                id={`tabpanel-${child.props.index}`}
                aria-labelledby={`tab-${child.props.index}`}
            >
                {value === child.props.index && (
                    <Box sx={{ p: 3 }}>
                        {child.props.children}
                    </Box>
                )}
            </div>
        );
    })
    const tabs = children.map(child => {
        return (
            <Tab label={child.props.label} {...a11yProps(child.props.index)} />
        );
    })

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="tabs"
                    centered
                    selectionFollowsFocus
                    textColor="secondary"
                    indicatorColor="secondary"
                >
                    {tabs}
                </Tabs>
            </Box>
            {rootChild}
        </Box>
    )
}


interface TabPanelProps {
    children?: React.ReactElement;
    index: number;
    label: string
}

function TabPanel(props: TabPanelProps) {
    const { children } = props;

    return (
        <div>
            {children}
        </div>
    );
}
export { TabList, TabPanel } 