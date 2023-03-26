<?php

namespace App\Controller;

use App\Entity\Comment;
use App\Entity\Post;
use App\Form\PostType;
use App\Repository\CommentRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\User\UserInterface;
use App\Service\FormService;

class AdminController extends AbstractController
{
    #[Route('/admin/comments', name: 'get_admin_comments', methods: ['GET'])]
    public function getAdminComments(CommentRepository $commentRepository): JsonResponse
    {
        $comments = $commentRepository->findBy(['published' => false]);
        return $this->json($comments, Response::HTTP_OK, [], ['groups' => ['comments']]);
    }

    #[Route('/admin/comments/{id}', name: 'delete_comment', methods: ['DELETE'])]
    public function deleteComment(Comment $comment, EntityManagerInterface $entityManager): JsonResponse
    {
        $entityManager->remove($comment);
        $entityManager->flush();
        return $this->json(null, Response::HTTP_NO_CONTENT);
    }
    #[Route('/admin/comments/{id}/publish', name: 'publish_comment', methods: ['PUT'])]
    public function publishComment(Comment $comment, EntityManagerInterface $entityManager): JsonResponse
    {
        $comment->setPublished(true);
        $entityManager->flush();
        return $this->json($comment, Response::HTTP_OK, [], ['groups' => ['comments']]);
    }

    #[Route('/posts', name: 'publish_post', methods: ['POST'])]
    public function publishPost(Request $request, UserInterface $user, FormService $formService, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $post = new Post();
        $form = $this->createForm(PostType::class, $post);
        $form->submit($data);
        if($form->isValid()) {
            $img = explode('base64,', $post->getPicture())[1];
            $img = str_replace(' ', '+', $img);
            $data = base64_decode($img);
            $file = 'uploads/posts/' . uniqid() . '.png';
            $success = file_put_contents($file, $data);

            $post->setPicture('http://localhost:8081/' . $file)
                ->setDate(new \DateTime())
                ->setAuthor($user);

            $entityManager->persist($post);
            $entityManager->flush();
            return $this->json($post, Response::HTTP_OK, [], ['groups' => ['get_post']]);
        } else {
            return $this->json($formService->getErrors($form), Response::HTTP_BAD_REQUEST);
        }
    }


    #[Route('/admin/posts/{id}', name: 'delete_post', methods: ['DELETE'])]
    public function deletePost(Post $post, EntityManagerInterface $entityManager): JsonResponse
    {
        $entityManager->remove($post);
        $entityManager->flush();
        return $this->json(null, Response::HTTP_NO_CONTENT);
    }

}
