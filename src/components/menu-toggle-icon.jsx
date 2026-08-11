const MenuToggleIcon = ({ open }) => {
	return (
		<span className={`menu-toggle-icon ${open ? 'open' : ''}`} aria-hidden='true'>
			<span />
			<span />
			<span />
		</span>
	);
};

export default MenuToggleIcon;
