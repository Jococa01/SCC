<?php

namespace App\Controller;

use App\Entity\Team;
use App\Entity\Player;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class TeamController extends AbstractController
{
    #[Route('/teams', name: 'app_teams')]
    public function index(EntityManagerInterface $entityManager): Response
    {
        $TeamRepository = $entityManager->getRepository(Team::class);
        return $this->render('index.html.twig', [
            'data' => $TeamRepository->findAll()
        ]);
    }
    #[Route('/teams/{team}', name: 'app_playersTeam', methods:['GET'])]
    public function playersinteam(EntityManagerInterface $entityManager, string $team): Response
    {
        $PlayerRepo = $entityManager->getRepository(Player::class);
        return $this->render('team.html.twig', [
            'data' => $PlayerRepo->findBy(['team'=>$team])
        ]);
    }
}
