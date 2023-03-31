<?php

namespace App\Repository;

use App\Entity\Post;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Post>
 *
 * @method Post|null find($id, $lockMode = null, $lockVersion = null)
 * @method Post|null findOneBy(array $criteria, array $orderBy = null)
 * @method Post[]    findAll()
 * @method Post[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class PostRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Post::class);
    }

    public function findPosts(array $criteria, $page, $nbPerPage, string $sortColumn = null, string $sortDirection = null): array {
        $qb = $this->createQueryBuilder('p');

        if(isset($criteria['author'])) {
            $qb->andWhere($qb->expr()->eq('p.author', ':author'))
                ->setParameter('author', $criteria['author']);
        }

        if(isset($criteria['category'])) {
            $qb->andWhere($qb->expr()->eq('p.category', ':category'))
                ->setParameter('category', $criteria['category']);
        }

        if(isset($criteria['search'])) {
            $qb->andWhere($qb->expr()->like('p.title', ':search'))
                ->setParameter('search', '%' . $criteria['search'] . '%');
        }

        if(isset($criteria['start'])) {
            $qb->andWhere($qb->expr()->gte('p.date', ':start'))
                ->setParameter('start', $criteria['start']);
        }

        if(isset($criteria['end'])) {
            $qb->andWhere($qb->expr()->lte('p.date', ':end'))
                ->setParameter('end', $criteria['end']);
        }

        if(isset($sortColumn)) {
            $qb->orderBy('p.' . $sortColumn, $sortDirection ?? 'ASC');
        }

        $total = count($qb->getQuery()->getResult());

        $qb->setMaxResults($nbPerPage)
            ->setFirstResult($page > 1 ? ($nbPerPage * ($page - 1) - 2) : ($nbPerPage * ($page - 1))); // BUG Volontaire

        return ['total' => $total, 'list' => $qb->getQuery()->getResult()];
    }

    public function save(Post $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(Post $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

//    /**
//     * @return Post[] Returns an array of Post objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('p')
//            ->andWhere('p.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('p.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?Post
//    {
//        return $this->createQueryBuilder('p')
//            ->andWhere('p.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
