<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\UserType;
use App\Service\FormService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;

class HomeController extends AbstractController
{
    #[Route('/register', name: 'register', methods: ['POST'])]
    public function register(Request $request, UserPasswordHasherInterface $hasher, EntityManagerInterface $entityManager, FormService $formService): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $user = new User();
        $form = $this->createForm(UserType::class, $user);
        $form->submit($data);
        if ($form->isValid()) {
            $user
                ->setRoles(['ROLE_USER', 'ROLE_ADMIN'])
                ->setPassword($hasher->hashPassword($user, $user->getPassword()));
            $entityManager->persist($user);
            $entityManager->flush();
            return $this->json($user, Response::HTTP_CREATED, [], ['groups' => ['user']]);
        } else {
            return $this->json($formService->getErrors($form), Response::HTTP_BAD_REQUEST);
        }
    }
}
