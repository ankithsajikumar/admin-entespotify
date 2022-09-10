import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React from 'react'
import { Link, LinkProps } from 'react-router-dom'

interface ListItemLinkProps {
    icon?: React.ReactElement,
    primary: string,
    to: string
}

function LinkComponent(props: ListItemLinkProps) {
    const { icon, primary, to } = props
    const renderLink = React.useMemo(
        () => React.forwardRef<HTMLAnchorElement, Omit<LinkProps, 'to'>>(function Links(itemProps, ref) {
            return <Link to={to} ref={ref} {...itemProps} role={undefined} />;
        }), [to]
    )

    return (
        <ListItemButton component={renderLink}>
            {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
            <ListItemText primary={primary} />
        </ListItemButton>
    )
}
export default LinkComponent
