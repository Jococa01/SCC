<?php

namespace App\Controller\API;

use App\Entity\Team;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/teams', name: 'api_teams_')]
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
}
