<?php

namespace App\Controller\API;

use App\Entity\Player;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/players', name: 'api_players_')]
class PlayersCRUDController extends AbstractController
{
    #[Route('', name: 'list', methods:['GET'])]
    public function list(EntityManagerInterface $entityManager): JsonResponse
    {
        $results = $entityManager->getRepository(Player::class)->findAll();
        $data = [];
        foreach ($results as $player) {
            $data[] = [
                'NICK'=>$player->getNick(),
                'NAME'=>$player->getName(),
                'FLAG' => $player->getFlag(),
            ];
        }
        return $this->json($data);
    }

    // #[Route('/{team}', name: 'team_list', methods:['GET'])]
    // public function team_list(EntityManagerInterface $entityManager, string $team): JsonResponse
    // {
    //     $results = $entityManager->getRepository(Player::class)->findBy(['team'=>$team]);
    //     $data = [];
    //     foreach ($results as $player) {
    //         $data[] = [
    //             'NICK'=>$player->getNick(),
    //             'NAME'=>$player->getName(),
    //             'FLAG' => $player->getFlag(),
    //         ];
    //     }
    //     return $this->json($data);
    // }
}
