<?php

namespace App\Controller;

use App\Entity\Category;
use App\Entity\Comment;
use App\Entity\Post;
use App\Entity\User;
use App\Form\CommentType;
use App\Repository\CategoryRepository;
use App\Repository\PostRepository;
use App\Service\FormService;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\Exception\ORMException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;

class BlogController extends AbstractController
{
    public function __construct(private PostRepository $postRepository, private EntityManagerInterface $entityManager)
    {

    }

    /**
     * @throws ORMException
     */
    #[Route('/posts', name: 'get_posts', methods: ['GET'])]
    public function getPosts(Request $request, NormalizerInterface $normalizer): JsonResponse
    {
        $author = $request->query->get('author') ? $this->entityManager->getReference(Post::class, intval($request->query->get('author'))) : null;
        $page = intval($request->query->get('page', 1));
        $limit = intval($request->query->get('limit', 10));
        $sortColumn = $request->query->get('sort-column', 'date');
        $sortDirection = $request->query->get('sort-direction', 'DESC');
        $category = $request->query->get('category') ? $this->entityManager->getReference(Category::class, intval($request->query->get('category'))) : null;
        $search = $request->query->get('search', '');

        $criteria = [];

        if (!is_null($author)) {
           // BUG volontaire : $criteria['author'] = $author;
        }

        if (!is_null($category)) {
            $criteria['category'] = $category;
        }

        if($search) {
            $criteria['search'] = $search;
        }

        ['total' => $total, 'list' => $list] = $this->postRepository->findPosts($criteria, $page, $limit, $sortColumn, $sortDirection);
        $posts = $normalizer->normalize($list, null, ['groups' => ['get_posts']]);

        return $this->json(['total' => $total, 'list' => $posts]);
    }

    #[Route('/categories', name: 'get_categories', methods: ['GET'])]
    public function getCategories(CategoryRepository $categoryRepository): JsonResponse
    {
        return $this->json($categoryRepository->findAll(), Response::HTTP_OK, [], ['groups' => ['get_posts']]);
    }

    #[Route('/categories/{id}', name: 'get_category', methods: ['GET'])]
    public function getCategory(Category $category): JsonResponse
    {
        return $this->json($category, Response::HTTP_OK, [], ['groups' => ['get_posts']]);
    }

    #[Route('/users/{id}', name: 'get_user', methods: ['GET'])]
    public function getSingleUser(User $user): JsonResponse
    {
        return $this->json($user, Response::HTTP_OK, [], ['groups' => ['get_posts']]);
    }

    #[Route('/posts/{id}', name: 'get_post', methods: ['GET'])]
    public function getPost(Post $post): JsonResponse
    {
        foreach($post->getComments() as $comment) {
            if(!$comment->isPublished() && (is_null($this->getUser()) || $comment->getAuthor()->getId() !== $this->getUser()->getId())) {
                $post->removeComment($comment);
            }
        }


        return $this->json($post, Response::HTTP_OK, [], ['groups' => ['get_post']]);
    }

    #[Route('/posts/{id}/comments', name: 'post_comment', methods: ['POST'])]
    public function postComment(Post $post, Request $request, UserInterface $user, FormService $formService): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $comment = new Comment();
        $form = $this->createForm(CommentType::class, $comment);
        $form->submit($data);
        if ($form->isValid()) {
            $comment
                ->setAuthor($user)
                ->setPost($post)
                ->setPublished(false)
                ->setDate(new \DateTime());
            $this->entityManager->persist($comment);
            $this->entityManager->flush();
            return $this->json($comment, Response::HTTP_CREATED, [], ['groups' => ['get_post']]);
        } else {
            return $this->json($formService->getErrors($form), Response::HTTP_BAD_REQUEST);
        }
    }
}
