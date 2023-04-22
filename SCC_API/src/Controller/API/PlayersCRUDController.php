<?php

namespace App\Controller\API;

use App\Entity\Player;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

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
                // 'NAME' => mb_convert_encoding($associated->getName(), 'ISO-8859-1'),
                // 'MAIL' => $associated->getMail(),
                // 'TELF' => $associated->getPhone(),
                // 'LOC' => mb_convert_encoding($associated->getLoc(), 'ISO-8859-1'),
                // 'PROV' => mb_convert_encoding($associated->getProv(), 'ISO-8859-1'),
                // 'DATE' => $associated->getDate()->format('l d M Y')
            ];
        }
        return $this->json($data);
    }
}
