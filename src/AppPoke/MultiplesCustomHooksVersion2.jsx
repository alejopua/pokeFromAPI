// import { useCounter } from "../hooks/useCounter";
import { useCounter } from "../hooks/useCounter";
import { useFetch } from "../hooks/useFetch"
import { LoadingMsg } from "./LoadingMsg";
import { PokemonCard } from "./PokemonCard";

export const MultiplesCustomHooksVersion2 = () => {
  const { counter, decrement, increment } = useCounter(1);
  const { data, isLoading, hasError } = useFetch(`https://pokeapi.co/api/v2/pokemon/${ counter }`);

  return (
    <>
      <h1>Información de Pokémon</h1>
      <hr />
      <div className="d-flex justify-content-center align-items-center gap-2 mx-auto mb-2">
        <button 
          className="btn btn-primary" 
          disabled={isLoading} 
          onClick={() => counter > 1 ? decrement() : null}>Back</button>
        <button 
          className="btn btn-primary" 
          disabled={isLoading} 
          onClick={() => increment()}>Next</button>
      </div>
      {
        (isLoading)
          ? <LoadingMsg />
          : hasError 
            ? <h5>Data no obtenida, revise la api o url.</h5> 
            : ( 
                <PokemonCard 
                  { ...data } 
                  sprites={[
                    data.sprites.other.dream_world.front_default
                  ]}
                />
              )
      }    

    </>
  )
}
