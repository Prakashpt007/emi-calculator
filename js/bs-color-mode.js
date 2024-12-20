/*!
 * Color mode toggler for Bootstrap's docs (https://getbootstrap.com/)
 * Copyright 2011-2023 The Bootstrap Authors
 * Licensed under the Creative Commons Attribution 3.0 Unported License.
 */

( () => {
	'use strict';

	setStoredTheme( getPreferredTheme() );


	window
		.matchMedia( "(prefers-color-scheme: dark)" )
		.addEventListener( "change", () => {
			const storedTheme = getStoredTheme();
			if ( storedTheme !== "light" && storedTheme !== "dark" )
			{
				setStoredTheme( getPreferredTheme() );
			}
		} );



} )();

function getStoredTheme () {
	console.log( localStorage.getItem( "theme" ) );
	if ( localStorage.getItem( "theme" ) == null )
	{
		changeTheme( "auto" );
	}

	return localStorage.getItem( "theme" );
}

function changeTheme ( theme ) {
	console.log( theme );
	document.documentElement.setAttribute( "data-bs-theme", theme );
	localStorage.setItem( "theme", theme );
}

function setStoredTheme ( theme ) {
	localStorage.setItem( "theme", theme );
}


function getPreferredTheme () {
	const storedTheme = getStoredTheme();
	if ( storedTheme )
	{
		return storedTheme;
	}

	return window.matchMedia( "(prefers-color-scheme: dark)" ).matches
		? "dark"
		: "light";
}