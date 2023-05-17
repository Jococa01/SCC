<?php

namespace App\Controller\API;

use App\Entity\Player;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\Query\Expr\Math;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/api/player', name: 'api_players_')]
class PlayersCRUDController extends AbstractController
{
    #[Route('s', name: 'list', methods:['GET'])]
    public function list(EntityManagerInterface $entityManager): JsonResponse
    {
        $results = $entityManager->getRepository(Player::class)->findAll();
        $data = [];
        foreach ($results as $player) {

            if($player->getAge()!=null){
                $currentDate = date("Y-m-d");
                $toString = $player->getAge()->format("Y-m-d");
                $diff = date_diff(date_create($toString), date_create($currentDate));
                $age = $diff->format('%y');
            }else{
                $age = "";
            }

            $data[] = [
                'ID'=>$player->getId(),
                'NICK'=>$player->getNick(),
                'NAME'=>$player->getName(),
                'TEAM' => $player->getTeam()->getName(),
                'ROLE' => $player->getRole()->getName(),
                'FLAG' => $player->getFlag(),
                'PHOTO' => $player->getPhoto(),
                'AGE'=> $age
            ];
        }
        return $this->json($data);
    }

    #[Route('/{id}', name: 'single', methods:['GET'])]
    public function single(EntityManagerInterface $entityManager, string $id): JsonResponse
    {
        $results = $entityManager->getRepository(Player::class)->findBy(['id'=>$id]);
        $data = [];
        foreach ($results as $player) {
            if($player->getAge()!=null){
                $currentDate = date("Y-m-d");
                $toString = $player->getAge()->format("Y-m-d");
                $diff = date_diff(date_create($toString), date_create($currentDate));
                $age = $diff->format('%y');
            }else{
                $age = "";
            }
            $data[] = [
                'ID'=>$player->getId(),
                'NICK'=>$player->getNick(),
                'NAME'=>$player->getName(),
                'TEAM' => $player->getTeam() == null ? "No team": [
                    'ID' => $player->getTeam()->getId(),
                    'NAME' => $player->getTeam()->getName(),
                    'LOGO' => $player->getTeam()->getLogo()
                ],
                'ROLE' => $player->getRole()->getName(),
                'FLAG' => $player->getFlag(),
                'PHOTO' => $player->getPhoto(),
                'AGE'=> $age
            ];
        }
        return $this->json($data);
    }

    #[Route('s/fa', name: 'fa', methods:['GET'])]
    public function fa(EntityManagerInterface $entityManager): JsonResponse
    {
        $results = $entityManager->getRepository(Player::class)->findBy(['team'=>null]);
        $data = [];
        foreach ($results as $player) {

            if($player->getAge()!=null){
                $currentDate = date("Y-m-d");
                $toString = $player->getAge()->format("Y-m-d");
                $diff = date_diff(date_create($toString), date_create($currentDate));
                $age = $diff->format('%y');
            }else{
                $age = "";
            }

            $data[] = [
                'ID'=>$player->getId(),
                'NICK'=>$player->getNick(),
                'NAME'=>$player->getName(),
                'ROLE' => $player->getRole()->getName(),
                'FLAG' => $player->getFlag(),
                'PHOTO' => $player->getPhoto(),
                'AGE'=> $age
            ];
        }
        return $this->json($data);
    }

    #[Route('/search/{nick}', name: 'query', methods:['GET'])]
    public function query(EntityManagerInterface $entityManager, string $nick): JsonResponse
    {
        $QB = $entityManager->getRepository(Player::class)->createQueryBuilder('o')
        ->where('o.nick LIKE :nick OR o.name LIKE :nick')
        ->setParameter('nick', '%'.$nick.'%');

        $query = $QB->getQuery();

        $results = $query->execute();

        $data = [];
        foreach ($results as $player) {

            if($player->getAge()!=null){
                $currentDate = date("Y-m-d");
                $toString = $player->getAge()->format("Y-m-d");
                $diff = date_diff(date_create($toString), date_create($currentDate));
                $age = $diff->format('%y');
            }else{
                $age = "";
            }

            $data[] = [
                'ID'=>$player->getId(),
                'NICK'=>$player->getNick(),
                'NAME'=>$player->getName(),
                'FLAG' => $player->getFlag(),
                'PHOTO' => $player->getPhoto(),
                'AGE'=> $age,
                'TEAM' => $player->getTeam() == null ? "No team": [
                    'ID' => $player->getTeam()->getId(),
                    'NAME' => $player->getTeam()->getName(),
                    'LOGO' => $player->getTeam()->getLogo()
                ]
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
