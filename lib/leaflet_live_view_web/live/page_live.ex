defmodule LeafletLiveViewWeb.PageLive do
  use LeafletLiveViewWeb, :live_view

  @impl true
  def mount(_params, _session, socket) do
    socket = assign(socket, markers: fetch_markers())
    {:ok, socket}
  end

  @impl true
  def handle_event("toggle_marker", %{"id" => id} = _params, socket) do
    {id, _} = Integer.parse(id)

    updated_markers =
      Enum.map(socket.assigns.markers, fn m ->
        case m.id do
          ^id ->
            Map.update(m, :selected, m.selected, &(!&1))

          _ ->
            m
        end
      end)

    {:noreply, assign(socket, markers: updated_markers)}
  end

  def get_icon_url(true) do
    "/images/elixir-icon.png"
  end

  def get_icon_url(false) do
    "/images/dark-elixir-icon.png"
  end

  defp fetch_markers do
    # Enum.map(1..100, fn x ->
    #   %{
    #     id: x,
    #     lat: 51.5,
    #     lng: -0.09,
    #     selected: false
    #   }
    # end)

    [
      %{id: 1, lat: 51.5, lng: -0.09, selected: false},
      %{id: 2, lat: 51.5, lng: -0.099, selected: true}
    ]
  end
end
