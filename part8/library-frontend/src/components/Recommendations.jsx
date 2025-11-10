import { useQuery } from "@apollo/client/react"
import { BOOKS, ME } from "../queries"

const Recommendations = ({ show }) => {

    const { loading, data } = useQuery(ME)

    const { loading: isLoading, data: booksData } = useQuery(BOOKS)

    if (!show || isLoading || loading) {
        return null
    }

    const user = data.me

    const books = booksData.allBooks

    const booksToShow = books.filter((b) => b.genres.includes(user.favoriteGenre))

    return (
        <>
            <h1>recommendations</h1>
            <div>books in your favorite genre <strong>{user.favoriteGenre}</strong></div>
            <table>
                <tbody>
                <tr>
                    <th></th>
                    <th>author</th>
                    <th>published</th>
                </tr>
                {booksToShow.map((a) => (
                    <tr key={a.title}>
                        <td>{a.title}</td>
                        <td>{a.author.name}</td>
                        <td>{a.published}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    )
}

export default Recommendations