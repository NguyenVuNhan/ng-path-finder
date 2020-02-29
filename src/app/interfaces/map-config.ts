import {BreadthFirstSearch} from "../classes/algorithm/breadth-first-search";
import {DijkstraAlgorithm} from "../classes/algorithm/dijkstra-algorithm";
import {GreedyBestFirstSearch} from "../classes/algorithm/greedy-best-first-search";
import {AStarAlgorithm} from "../classes/algorithm/a-star-algorithm";
import {Node} from "../classes/base/node";

export const algorithms: { [id: string]: any } = {
  "Breadth First Search": BreadthFirstSearch,
  "Greedy Breadth First Search": GreedyBestFirstSearch,
  "Dijkstra's Algorithm": DijkstraAlgorithm,
  "A* Algorithm": AStarAlgorithm
};

export interface IMapData {
  map: Node[][];
  start: Node;
  end: Node;
  width: number;
  height: number;
}
