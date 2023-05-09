<?php

namespace App\Controller;

use App\Entity\Player;
use App\Entity\Team;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class HomeController extends AbstractController
{
    // #[Route('', name: 'app_home')]
    public function index(EntityManagerInterface $entityManager): Response
    {
        $TeamRepository = $entityManager->getRepository(Team::class);
        return $this->render('index.html.twig', [
            'data' => $TeamRepository->findAll()
        ]);
    }
}
