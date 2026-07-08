import NavBar from '../NavBar'

export default function Friends() {
    return (
        <>
            <NavBar/>
            <label htmlFor="site-search">Search the site:</label>
            <input type="search" id="site-search" name="q"/>

            <button>Search</button></>


)
}