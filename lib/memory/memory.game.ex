defmodule Memory.Game do
  def init_game() do
    %{
      board: new_board(),
      render: [],
      trying: [],
      done: [],
    }
  end

  def client_view(game) do
    %{
    trying: game.trying,
    done: game.done,
    }
  end

  def render(game) do
    Enum.map(Enum.with_index(game.board), fn {letter, index} ->
      cond do
        Enum.member?(game.trying, index) ->
          letter
        Enum.member?(game.done, index) ->
          letter
        true -> render = " "
      end end)

  end

  def guess(game, index) do
   if(length(game.trying < 2)) do
     game = Map.put(game, :trying, game/selected ++ [index])
     else
     game
   end
  end

  def check(game) do
    if ((Enum.at(game.trying, 0)) == (Enum.at(game.trying, 1))) do
      game = Map.put(game, :trying, [])
      else
      if (Enum.at(game.board, (Enum.at(game.trying, 0)))) ===
        (Enum.at(game.board, (Enum.at(game.trying, 1)))) do
        game
        |> Map.put(:done, game.done ++ [Enum.at(game.trying, 0), Enum.at(game.trying, 1)])
        |> Map.put(:trying, [])
      end
      game = Map.put(game, :trying, [])
      end
    end
  end


  def new_board() do
    board = Enum.shuffle(['a','a','b','b','c','c','d','d','e','e','f','f','g','g','h','h'])

    board
  end
end