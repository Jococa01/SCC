<?php

namespace App\Controller\API;

use App\Entity\Player;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/api/players', name: 'api_players_')]
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
                'PHOTO' => $player->getPhoto()
            ];
        }
        return $this->json($data);
    }

    #[Route('/insert', name: 'insert', methods: ['POST'])]
    public function insert(EntityManagerInterface $entityManager, Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $entityManager->getRepository(Player::class)->insert($data);
        return $this->json(['message' => "Jugador insertado correctamente"]);
    }
}
