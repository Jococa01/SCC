<?php

namespace App\Controller;

use App\Entity\Team;
use App\Entity\Player;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class PlayerController extends AbstractController
{
    #[Route('/players', name: 'app_players')]
    public function players(EntityManagerInterface $entityManager): Response
    {
        $PlayerRepository = $entityManager->getRepository(Player::class);
        return $this->render('players.html.twig', [
            'data' => $PlayerRepository->findAll()
        ]);
    }
    #[Route('/newplayer', name: 'app_newplayer')]
    public function newplayer(EntityManagerInterface $entityManager): Response
    {
        $TeamRepository = $entityManager->getRepository(Team::class);
        return $this->render('newplayer.html.twig', [
            'data' => $TeamRepository->findAll()
        ]);
    }
    #[Route('/insert', name: 'insert', methods: ['POST'])]
    public function insert(EntityManagerInterface $entityManager, Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $entityManager->getRepository(Player::class)->insert($data);
        return $this->json(['message' => "Jugador insertado correctamente"]);
    }
}
