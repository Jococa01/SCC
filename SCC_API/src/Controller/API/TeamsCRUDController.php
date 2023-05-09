<?php

namespace App\Controller\API;

use App\Entity\Team;
use App\Entity\Player;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/api/teams', name: 'api_teams_')]
class TeamsCRUDController extends AbstractController
{
    #[Route('', name: 'list', methods:['GET'])]
    public function list(EntityManagerInterface $entityManager): JsonResponse
    {
        $results = $entityManager->getRepository(Team::class)->findBy([],['ranking'=>'ASC']);
        $data = [];
        foreach ($results as $team) {
            $data[] = [
                'RANKING'=>$team->getRanking(),
                'NAME'=>$team->getName(),
                'LOGO'=>$team->getLogo(),
                'FLAG' => $team->getFlag(),
                'ID'=>$team->getId(),
            ];
        }
        return $this->json($data);
    }
    #[Route('/{team}', name: 'players', methods:['GET'])]
    public function players(EntityManagerInterface $entityManager, string $team): JsonResponse
    {
        $PlayerRepo = $entityManager->getRepository(Player::class)->findBy(['team'=>$team]);
        $results = $entityManager->getRepository(Team::class)->findBy(['id'=>$team]);

        $data = [];
        $playersArray = [];
        
        foreach ($PlayerRepo as $player) {
            $playersArray[] = [
                'ID'=>$player->getId(),
                'NICK'=>$player->getNick(),
                'NAME'=>$player->getName(),
                'FLAG' => $player->getFlag(),
                'PHOTO' => $player->getPhoto()
            ];
        }

        foreach ($results as $team) {
            $data[] = [
                'ID'=>$team->getId(),
                'RANKING'=>$team->getRanking(),
                'NAME'=>$team->getName(),
                'LOGO'=>$team->getLogo(),
                'FLAG' => $team->getFlag(),
                'PLAYERS'=> $playersArray?:'none'
            ];
        }

        return $this->json($data);
    }
}
