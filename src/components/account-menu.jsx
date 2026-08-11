import { useId, useState } from 'react';
import AccountActions from './account-actions';
import MenuToggleIcon from './menu-toggle-icon';

const AccountMenu = () => {
	const [open, setOpen] = useState(false);
	const menuId = useId();

	return (
		<div className='account-menu'>
			<button
				className='account-menu-toggle'
				type='button'
				onClick={() => setOpen((current) => !current)}
				aria-label={open ? 'Close account menu' : 'Open account menu'}
				aria-expanded={open}
				aria-controls={menuId}
			>
				<MenuToggleIcon open={open} />
			</button>
			{open && (
				<AccountActions className='account-menu-panel' id={menuId} />
			)}
		</div>
	);
};

export default AccountMenu;
