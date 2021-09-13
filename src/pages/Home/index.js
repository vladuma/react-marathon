import MenuHeader from '../../components/MenuHeader';
import Header from '../../components/Header';
import Layout from '../../components/Layout';
import Footer from '../../components/Footer';

import bg1 from '../../assets/bg1.jpg';
import bg3 from '../../assets/bg3.jpg';

import POKEMONS from '../../assets/pokemon.json';
import PokemonCard from '../../components/PokemonCard';

const Home = ({ onPageChange }) => {
  return (
    <>
        <MenuHeader
            onPageChange={onPageChange}
        />
        <Header
            title="Pokemon game"
            descr="Some description"
        />
        <Layout
            title="Game rules"
            urlBg={bg1}
        >
            <p>
            In the game two players face off against one another, one side playing as "blue", the other as "red" on a 3x3 grid.
            Each player has five cards in a hand and the aim is to capture the opponent's cards by turning them into the player's own color of red or blue.
            </p>
            <p>
            To win, a majority of the total ten cards played (including the one card that is not placed on the board) must be of the player's card color. To do this, the player must capture cards by placing a card adjacent to an opponent's card whereupon the 'ranks' of the sides where the two cards touch will be compared. If the rank of the opponent's card is higher than the player's card, the player's card will be captured and turned into the opponent's color. If the player's rank is higher, the opponent's card will be captured and changed into the player's color instead. 
            </p>
        </Layout>
        <Layout
            title="Cards"
            colorBg="#e2e2e2"
        >
            <div className="flex">
            {
                POKEMONS.map((pokemon) => (<PokemonCard
                key={pokemon.id}
                id={pokemon.id}
                name={pokemon.name}
                type={pokemon.type}
                values={pokemon.values}
                img={pokemon.img}
                />))
            } 
            </div>
        </Layout>
        <Layout
            title="Layout 3 title"
            descr="Layout 3 description"
            urlBg={bg3}
        />
        <Footer />
    </>
  );
}

export default Home;
